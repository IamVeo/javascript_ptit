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

// Dữ liệu mẫu ban đầu để test (bạn có thể xóa nếu muốn danh sách trống)
let studentList = [
    new Student("B36DCCN336", "Trịnh Thị Tuyết Anh", "2036-06-03", "D36CTCN01-B", 3.36),
];

// Khởi chạy render lần đầu
document.addEventListener('DOMContentLoaded', renderTable);

function saveStudent() {
    const id = document.getElementById('id').value.trim();
    const fullName = document.getElementById('fullname').value.trim();
    const dob = document.getElementById('dob').value;
    const classRoom = document.getElementById('classRoom').value.trim();
    const gpa = parseFloat(document.getElementById('gpa').value);
    const editIndex = parseInt(document.getElementById('editIndex').value);

    // Validate dữ liệu
    if (!id || !fullName || !dob || !classRoom || isNaN(gpa)) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if(gpa < 0.0 || gpa > 10.0){
        alert("GPA phải từ 0.0 đến 10.0!");
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
        // Kiểm tra xem ID mới có bị trùng với sinh viên KHÁC không (nếu cho sửa ID)
        // Ở đây ta giả định ID là cố định hoặc logic đơn giản
        studentList[editIndex].updateInfo(fullName, dob, classRoom, gpa);
        studentList[editIndex].id = id; 
    }

    renderTable();
    resetForm();
}

function deleteStudent(index) {
    const student = studentList[index];
    const confirmMsg = `Bạn có chắc chắn muốn xóa sinh viên: ${student.fullName} (${student.id})?`;
    
    if (confirm(confirmMsg)) {
        studentList.splice(index, 1); // Xóa phần tử khỏi mảng
        
        // Nếu đang sửa đúng sinh viên bị xóa thì reset form
        const currentEditIndex = parseInt(document.getElementById('editIndex').value);
        if (currentEditIndex === index) {
            resetForm();
        } else if (currentEditIndex > index) {
            // Cập nhật lại index đang sửa nếu nó nằm sau phần tử bị xóa
            document.getElementById('editIndex').value = currentEditIndex - 1;
        }

        renderTable();
    }
}

function sortByName() {
    studentList.sort((a, b) => {
        // Tách tên để sắp xếp chính xác hơn (ví dụ: "Nguyễn Văn An" thì lấy "An")
        // Tuy nhiên, để đơn giản và hiệu quả với tiếng Việt, ta dùng localeCompare lên toàn bộ chuỗi
        return a.fullName.localeCompare(b.fullName, 'vi', { sensitivity: 'base' });
    });
    renderTable();
}

function sortByGPA() {
    // Sắp xếp giảm dần (Điểm cao lên đầu)
    studentList.sort((a, b) => b.gpa - a.gpa);
    renderTable();
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
                <td class="text-center action-col">
                    <button class="action-btn edit-btn" onclick="editStudent(${index})">Sửa</button>
                    <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Xóa</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function editStudent(index) {
    const student = studentList[index];

    document.getElementById('id').value = student.id;
    document.getElementById('fullname').value = student.fullName;
    document.getElementById('dob').value = student.dob;
    document.getElementById('classRoom').value = student.classRoom;
    document.getElementById('gpa').value = student.gpa;

    document.getElementById('editIndex').value = index;

    // UI thay đổi
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.innerText = "Cập nhật thông tin";
    saveBtn.classList.remove('btn-primary');
    saveBtn.classList.add('btn-warning'); 
    saveBtn.style.backgroundColor = "#ed8936"; 

    document.getElementById('cancelBtn').style.display = "block";
    document.getElementById('id').disabled = true;
    
    document.querySelector('.card').scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    document.getElementById('id').value = "";
    document.getElementById('fullname').value = "";
    document.getElementById('dob').value = "";
    document.getElementById('classRoom').value = "";
    document.getElementById('gpa').value = "";
    
    document.getElementById('editIndex').value = "-1";

    const saveBtn = document.getElementById('saveBtn');
    saveBtn.innerText = "Thêm Sinh Viên";
    saveBtn.classList.add('btn-primary');
    saveBtn.classList.remove('btn-warning');
    saveBtn.style.backgroundColor = ""; 

    document.getElementById('cancelBtn').style.display = "none";
    document.getElementById('id').disabled = false;
}

function formatDate(dateString) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

function getColorByGPA(gpa) {
    if (gpa >= 3.6) return "#48bb78"; // Giỏi - Xanh
    if (gpa >= 3.2) return "#3182ce"; // Khá - Xanh dương
    if (gpa >= 2.5) return "#d69e2e"; // Trung bình - Vàng
    return "#e53e3e"; // Yếu - Đỏ
}
