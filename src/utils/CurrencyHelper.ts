const CurrencyHelper = {
  formatVND: (value: any) => {
    if (value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    } else {
      return "";
    }
  },
};

export default CurrencyHelper;
