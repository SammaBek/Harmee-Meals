let soc = null;
let io = null;
let message;

module.exports = {
  start: function (socket) {
    io = socket;
    io.on("connection", function (socket) {
      soc = socket;
    });
  },
  newNotification: function () {
    soc.on("newNotification", (data) => {
      message = data;
    });

    return message;
  },
};
