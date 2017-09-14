const helper = (function () {
  return {
    formatDate: function (date) {
      const dateObject = new Date(date);
      return `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()}`;
    },
    urlParams: function (name) {
	    let results = new RegExp("[\?&]" + name + "=([^&#]*)").exec(window.location.href);
	    if (results==null){
	       return null;
	    }
	    else{
	       return decodeURI(results[1]) || 0;
	    }
    }
  }
})();
