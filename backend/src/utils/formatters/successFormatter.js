const successFormatter = {
  formatSuccess(data, message = 'Success', code = 200) {
    return {
      status: 'success',
      message,
      data,
      code,
    };
  },

  formatList(items, total, page, limit, message = 'Success') {
    return {
      status: 'success',
      message,
      data: {
        items,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    };
  },
};

export default successFormatter;
