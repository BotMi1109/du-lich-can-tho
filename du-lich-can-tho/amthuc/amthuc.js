/*hien tung mon an*/
const foods = {
  nemnuong: {
    title: "Nem nướng",
    image: "image/nem-nuong.jpg",
    text: "Nem nướng là món ăn nổi tiếng được làm từ thịt heo xay nhuyễn, tẩm ướp gia vị rồi nướng trên bếp than hồng. Món ăn được dùng cùng rau sống, bánh hỏi và nước chấm đậm đà. Nem thơm lừng, ăn kèm rau sống, bánh hỏi và nước chấm đậm đà, tạo nên hương vị khó quên.",
  },

  banhxeo: {
    title: "Bánh xèo",
    image: "image/banh-xeo.jpg",
    text: "Bánh xèo miền Tây có lớp vỏ vàng giòn, nhân tôm, thịt, giá đỗ và hành lá. Khi ăn cuốn với rau sống và nước mắm chua ngọt rất hấp dẫn.Khi ăn cuốn cùng rau sống và chấm nước mắm chua ngọt sẽ mang đến hương vị thơm ngon, hấp dẫn.",
  },

  banhcong: {
    title: "Bánh cống",
    image: "image/banh-cong.jpg",
    text: "Bánh cống là đặc sản nổi tiếng với lớp vỏ giòn rụm, nhân tôm, thịt và đậu xanh béo bùi. Món ăn thường được dùng kèm rau sống, đồ chua và nước mắm chua ngọt rất vừa miệng.",
  },

  vitnauchao: {
    title: "Vịt nấu chao",
    image: "image/vit-nau-chao.jpg",
    text: "Vịt nấu chao có thịt mềm, nước dùng thơm béo từ chao, ăn cùng khoai môn và bún. Món lẩu thường ăn kèm khoai môn, rau xanh và bún, rất thích hợp cho những bữa ăn sum họp.",
  },

  laumam: {
    title: "Lẩu mắm",
    image: "image/lau-mam.jpg",
    text: "Lẩu mắm là món ăn đặc trưng miền Tây với nước dùng nấu từ mắm cá kết hợp hải sản và nhiều loại rau. Đây là món ăn hấp dẫn được nhiều du khách lựa chọn khi đến Cần Thơ.",
  },

  gaumdau: {
    title: "Gà um dâu",
    image: "image/ga-um-dau.jpg",
    text: "Gà um dâu là món ăn độc đáo kết hợp thịt gà ta với dâu Hạ Châu tạo nên vị chua thanh hấp dẫn. Vị chua thanh của dâu hòa quyện cùng thịt gà tạo nên hương vị mới lạ và hấp dẫn.",
  },

  lauban: {
    title: "Lẩu bần",
    image: "image/lau-ban.jpg",
    text: "Lẩu bần có vị chua thanh từ trái bần, kết hợp cá, tôm và rau đồng. Món ăn mang hương vị dân dã nhưng đậm đà, rất được người dân địa phương yêu thích.",
  },

  banhtet: {
    title: "Bánh tét lá cẩm",
    image: "image/banh-tet-la-cam.jpg",
    text: "Bánh tét lá cẩm có màu tím tự nhiên từ lá cẩm, nhân đậu xanh, thịt mỡ và trứng muối. Nhân bánh gồm đậu xanh, thịt mỡ và trứng muối, tạo nên hương vị thơm ngon, béo bùi.",
  },
};

// mở modal
function showFood(key) {
  const food = foods[key];

  if (!food) {
    console.error("Không tìm thấy món:", key);
    return;
  }

  document.getElementById("modal-img").src = food.image;
  document.getElementById("modal-title").textContent = food.title;
  document.getElementById("modal-text").textContent = food.text;

  document.getElementById("modal").style.display = "flex";
}

// đóng modal
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// click ra ngoài để đóng
window.addEventListener("click", function (e) {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// ESC để đóng modal
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.getElementById("modal").style.display = "none";
  }
});
