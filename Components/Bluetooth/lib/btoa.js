const Buffer = require("buffer").Buffer;

function btoa(str) {
  var buffer;

  if (str instanceof Buffer) {
    buffer = str;
  } else {
    buffer = Buffer.from(str.toString(), "binary");
  }

  return buffer.toString("base64");
}

export default btoa;
