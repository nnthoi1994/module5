//Yêu cầu 3: Sử dụng cú pháp ES6 đã học viết hàm trả về một mảng mới gộp 2 mảng courses và addedCourses
let courses = [
    { id: 1, title: "ReactJS Tutorial", rating: 4.2 },
    { id: 2, title: "Angular Tutorial", rating: 2.5 },
    { id: 3, title: "VueJS Tutorial", rating: 3.8 },
    { id: 4, title: "Java Tutorial", rating: 4 },
    { id: 5, title: "JavaScript Tutorial", rating: 3.5 },
];

let addedCourses = [
    { id: 6, title: "PHP Tutorial", rating: 3 },
    { id: 7, title: "C# Tutorial", rating: 2 },
    { id: 8, title: "Docker Tutorial", rating: 3.8 }
];


let allCourses = [...courses, ...addedCourses];

console.log("Danh sách tổng hợp (Merged List):");
console.log(allCourses);
