class Student {
    constructor(id, fullName, dob, classRoom, gpa) {
        this.id = id;
        this.fullName = fullName;
        this.dob = dob;
        this.classRoom = classRoom;
        this.gpa = gpa;
    }
  
    updateInfo(fullName, dob, classRoom, gpa) {
        this.fullName = fullName;
        this.dob = dob;
        this.classRoom = classRoom;
        this.gpa = gpa;
    }
}

let studentList = [];

function saveStudent() {
    const id = document.getElementById('id').value;
    const fullName = document.getElementById('fullname').value;
    const dob = document.getElementById('dob').value;
    const classRoom = document.getElementById('classRoom').value;
    const gpa = document.getElementById('gpa').value;
    const editIndex = parseInt(document.getElementById('editIndex').value);

    // Validate dữ liệu
    if (!id || !fullName || !dob || !classRoom || !gpa) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if(gpa < 0.0 || gpa > 4.0){
        alert("GPA không hợp lệ!");
        return;
    }

    if (editIndex === -1) {
        // === THÊM MỚI ===
        const isDuplicate = studentList.some(s => s.id === id);
        if (isDuplicate) {
            alert("Mã sinh viên này đã tồn tại!");
            return;
        }
        const newStudent = new Student(id, fullName, dob, classRoom, gpa);
        studentList.push(newStudent);
    } else {
        // === CẬP NHẬT ===
        studentList[editIndex].updateInfo(fullName, dob, classRoom, gpa);
        // Lưu ý: Logic thực tế thường không cho sửa ID, nhưng nếu muốn giữ tính năng này:
        studentList[editIndex].id = id; 
    }

    renderTable();
    resetForm();
}

function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";

    if (studentList.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#888; padding: 20px;">Chưa có dữ liệu sinh viên</td></tr>`;
        return;
    }

    studentList.forEach((student, index) => {
        const row = `
            <tr>
                <td><strong>${student.id}</strong></td>
                <td>${student.fullName}</td>
                <td>${formatDate(student.dob)}</td>
                <td>${student.classRoom}</td>
                <td><span style="font-weight:bold; color: ${getColorByGPA(student.gpa)}">${student.gpa}</span></td>
                <td class="text-center">
                    <button class="action-btn" onclick="editStudent(${index})">Chỉnh sửa</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function editStudent(index) {
    const student = studentList[index];

    // Đổ dữ liệu lên form
    document.getElementById('id').value = student.id;
    document.getElementById('fullname').value = student.fullName;
    document.getElementById('dob').value = student.dob;
    document.getElementById('classRoom').value = student.classRoom;
    document.getElementById('gpa').value = student.gpa;

    document.getElementById('editIndex').value = index;

    // Thay đổi giao diện nút bấm
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.innerText = "Cập nhật thông tin";
    
    // Đổi màu nút sang màu Cam (warning) để người dùng biết đang sửa
    saveBtn.classList.remove('btn-primary');
    saveBtn.classList.add('btn-warning'); 
    saveBtn.style.backgroundColor = "#ed8936"; 

    // Hiện nút Hủy bỏ
    document.getElementById('cancelBtn').style.display = "block";
    
    // Khóa ô mã sinh viên
    document.getElementById('id').disabled = true;

    // Cuộn màn hình lên đầu để nhập liệu
    document.querySelector('.card').scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    // Xóa trắng các ô input
    document.getElementById('id').value = "";
    document.getElementById('fullname').value = "";
    document.getElementById('dob').value = "";
    document.getElementById('classRoom').value = "";
    document.getElementById('gpa').value = "";
    
    document.getElementById('editIndex').value = "-1";

    // Reset giao diện nút bấm về ban đầu
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.innerText = "Thêm Sinh Viên";
    saveBtn.classList.add('btn-primary');
    saveBtn.classList.remove('btn-warning');
    saveBtn.style.backgroundColor = ""; // Xóa style inline để nhận lại màu từ CSS

    // Ẩn nút Hủy bỏ
    document.getElementById('cancelBtn').style.display = "none";
    // Mở khóa ô mã sinh viên
    document.getElementById('id').disabled = false;
}

// Hàm phụ trợ: Format ngày (yyyy-mm-dd -> dd/mm/yyyy)
function formatDate(dateString) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// Hàm phụ trợ: Màu sắc GPA
function getColorByGPA(gpa) {
    if (gpa >= 3.2) return "#48bb78"; // Xanh lá
    if (gpa >= 2.5) return "#d69e2e"; // Vàng cam
    return "#e53e3e"; // Đỏ
}
