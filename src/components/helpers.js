const helper = (function () {
  return {
    formatDate: function (date) {
      const dateObject = new Date(date);
      return `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()}`;
    }
  }
})();
