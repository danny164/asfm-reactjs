var addressObject={"Quận Cẩm Lệ":["Phường Hòa An","Phường Hòa Phát","Phường Hòa Thọ Đông","Phường Hòa Thọ Tây","Phường Hòa Xuân","Phường Khuê Trung",],"Quận Hải Châu":["Phường Bình Hiên","Phường Bình Thuận","Phường Hải Châu 1","Phường Hải Châu 2","Phường Hòa Cương Bắc","Phường Hòa Cường Nam","Phường Hòa Thuận Đông","Phường Hòa Thuận Tây","Phường Nam Dương","Phường Phước Ninh","Phường Thạch Thang","Phường Thạnh Bình","Phường Thuận Phước",],"Quận Liên Chiểu":["Phường Hòa Hiệp Bắc","Phường Hòa Hiệp Nam","Phường Hòa Khánh Bắc","Phường Hòa Khánh Nam","Phường Hòa Minh"],"Quận Ngũ Hành Sơn":["Phường Hòa Hải","Phường Hòa Quý","Phường Khuê Mỹ","Phường Mỹ An"],"Quận Sơn Trà":["Phường An Hải Bắc","Phường An Hải Đông","Phường An Hải Tây","Phường Mân Thái","Phường Nại Hiên Đông","Phường Phước Mỹ","Phường Thọ Quang",],"Quận Thanh Khê":["Phường An Khê","Phường Chính Gián","Phường Hòa Khê","Phường Tam Thuận","Phường Tân Chính","Phường Thạc Gián","Phường Thanh Khê Đông","Phường Thanh Khê Tây","Phường Vĩnh Trung","Phường Xuân Hà",],"Huyện Hòa Vang":["Xã Hòa Bắc","Xã Hòa Châu","Xã Hòa Khương","Xã Hòa Liên","Xã Hòa Nhơn","Xã Hòa Ninh","Xã Hòa Phong","Xã Hòa Phú","Xã Hòa Phước","Xã Hòa Sơn","Xã Hòa Tiến",],}

// window.onload = function () {
//     var districtSel = document.getElementById("districtSel"),
//         wardSel = document.getElementById("wardSel");
//     for (var district in addressObject) {
//         var c = (districtSel.options[districtSel.options.length] = new Option(district, district));
//         console.log(c);
//     }
//     districtSel.onchange = function () {
//         wardSel.length = 1; // Xóa thanh lựa chọn trước
//         if (this.selectedIndex < 1) return; // xong
//         var ward = addressObject[this.value];
//         for (var i = 0; i < ward.length; i++) {
//             wardSel.options[wardSel.options.length] = new Option(ward[i], ward[i]);
//         }
//     };
// };