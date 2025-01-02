import Quill from "@vueup/vue-quill";

// Import các module Quill nếu cần (ví dụ: Snow Theme, Toolbar, AutoGrow)
import "quill/dist/quill.snow.css"; // Theme Snow
import "quill/dist/quill.bubble.css"; // Theme Bubble (nếu dùng)


// Cấu hình các tùy chọn cho Quill
const quillConfig = {
  theme: "snow", // Chọn theme "snow" hoặc "bubble"
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // Các công cụ định dạng chữ
      [{ header: 1 }, { header: 2 }], // Header
      [{ list: "ordered" }, { list: "bullet" }], // Danh sách
      [{ script: "sub" }, { script: "super" }], // Chỉ số dưới và trên
      [{ indent: "-1" }, { indent: "+1" }], // Tăng/giảm thụt lề
      [{ direction: "rtl" }], // Hướng văn bản
      [{ size: ["small", false, "large", "huge"] }], // Kích thước chữ
      [{ color: [] }, { background: [] }], // Màu chữ và màu nền
      [{ align: [] }], // Căn chỉnh
      ["link", "image", "video"], // Chèn link, ảnh, video
      ["clean"], // Xóa định dạng
    ],
    clipboard: {
      matchVisual: false, // Không giữ nguyên định dạng khi paste
    },
  },
  placeholder: "Soạn nội dung ở đây...", // Placeholder của editor
  readOnly: false, // Nếu true, editor sẽ ở chế độ chỉ đọc
  scrollingContainer: null, // Container cuộn (nếu cần)
  bounds: null, // Giới hạn vùng editor
};

export default quillConfig;