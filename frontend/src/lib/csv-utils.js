import Papa from 'papaparse';

const UNIVERSITY_FIELDS = [
  'name',
  'shortName',
  'slug',
  'websiteUrl',
  'state',
  'country',
  'logo',
  'description',
  'isActive',
];

const CSV_TEMPLATE = UNIVERSITY_FIELDS.join(',');

export function parseCSV(text) {
  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });

  if (result.errors.length > 0) {
    throw new Error(
      `CSV parse error: ${result.errors[0].message} at row ${result.errors[0].row}`
    );
  }

  if (result.data.length === 0) {
    throw new Error('CSV must contain a header row and at least one data row.');
  }

  const headers = result.meta.fields.map((h) => h.toLowerCase());
  const expectedHeaders = UNIVERSITY_FIELDS.map((f) => f.toLowerCase());
  const missingFields = expectedHeaders.filter((f) => !headers.includes(f));

  if (missingFields.length > 0) {
    throw new Error(
      `Missing required columns: ${missingFields.join(', ')}. Expected headers: ${UNIVERSITY_FIELDS.join(', ')}`
    );
  }

  const rows = [];
  const errors = [];

  result.data.forEach((row, idx) => {
    const cleaned = {};
    UNIVERSITY_FIELDS.forEach((field) => {
      const headerKey = result.meta.fields.find(
        (h) => h.toLowerCase() === field.toLowerCase()
      );
      if (headerKey) {
        let val = row[headerKey];
        if (typeof val === 'string') val = val.trim();
        if (field === 'isActive') {
          cleaned[field] =
            val === false || val === 'false' || val === '0' || val === ''
              ? false
              : true;
        } else {
          cleaned[field] = val ?? '';
        }
      }
    });

    if (!cleaned.name || !String(cleaned.name).trim()) {
      errors.push({ row: idx + 2, message: 'Missing required field: name' });
      return;
    }
    if (!cleaned.slug || !String(cleaned.slug).trim()) {
      cleaned.slug = generateSlug(cleaned.name);
    }
    if (!cleaned.shortName || !String(cleaned.shortName).trim()) {
      cleaned.shortName = String(cleaned.name)
        .split(/\s+/)
        .map((w) => w.charAt(0).toUpperCase())
        .join('')
        .slice(0, 10);
    }
    if (!cleaned.country) {
      cleaned.country = 'India';
    }

    rows.push(cleaned);
  });

  return { rows, errors };
}

export function generateCSV(universities) {
  return Papa.unparse(universities, {
    columns: UNIVERSITY_FIELDS,
    header: true,
  });
}

export function downloadCSV(filename, csvContent) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateSlug(name) {
  return String(name)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getCSVTemplate() {
  return CSV_TEMPLATE;
}

export function getCSVTemplateWithSample() {
  const sampleRow =
    'University of Mumbai,MU,university-of-mumbai,https://mu.ac.in,Maharashtra,India,https://example.com/logo.png,A premier institution.,true';
  return `${CSV_TEMPLATE}\n${sampleRow}`;
}

export { UNIVERSITY_FIELDS };
