// Lấy các ô input và form
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const form = document.querySelector("form");

// Hàm hiển thị lỗi
function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.add("error");
  small.innerText = message;
}

// Hàm báo thành công
function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.remove("error");
  small.innerText = "";
}

// Hàm check các trường hợp để trống
function checkEmptyError(listInput) {
  let isEmptyError = false;

  //   console.log(listInput);
  for (let i = 0; i < listInput.length; i++) {
    let input = listInput[i];
    // console.log(input.value);
    input.value = input.value.trim();
    if (!input.value) {
      isEmptyError = true;
      showError(input, "Không được để trống");
    } else {
      showSuccess(input);
    }
  }

  return isEmptyError;
}

// Hàm check định dạng email
function checkEmailError(input) {
  // regex
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let isEmailError = !regexEmail.test(input.value);
  //   console.log(isEmailError);
  // Khi email bị lỗi thì sẽ return true
  if (regexEmail.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email invalid");
  }
  return isEmailError;
}

// Hàm check length của input (username, password, cfpassword)
function checkLengthError(input, name, min, max) {
  //   console.log(input.value);
  input.value = input.value.trim();
  if (input.value.length < min) {
    showError(input, `${name} has at least ${min} characters`);
    return true;
  }

  if (input.value.length > max) {
    showError(input, `${name} must not exceed ${max} characters`);
    return true;
  }
  showSuccess(input);
  return false;
}

function checkMathPassword(passwordInput, cfPasswordInput) {
  if (passwordInput.value !== cfPasswordInput.value) {
    showError(cfPasswordInput, "Password do not match");
    return true;
  }
  return false;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isEmptyError = checkEmptyError([
    username,
    email,
    password,
    confirmPassword,
  ]);

  let isEmailError = checkEmailError(email);

  let isUserNameLengthError = checkLengthError(username, "Username", 3, 10);
  let isPasswordLengthError = checkLengthError(password, "Password", 8, 25);
  let isCfPasswordError = checkMathPassword(password, confirmPassword);

  if (
    !isEmptyError &&
    !isEmailError &&
    !isUserNameLengthError &&
    !isPasswordLengthError &&
    !isCfPasswordError
  ) {
    // console.log(true);
    // Tạo đối tượng để thêm vào localStorage
    const userData = {
      id: Math.floor(Math.random() * 10000),
      username: username.value,
      email: email.value,
      password: password.value,
    };

    // console.log(userData);
    const userLocal = JSON.parse(localStorage.getItem("userData")) || [];
    const userList = [...userLocal, userData];
    // userLocal.push(userData);
    localStorage.setItem("userData", JSON.stringify(userList));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Bạn có thể đăng nhập ngay bây giờ !!!",
      showConfirmButton: false,
      timer: 2000,
    });

    window.location.href = "Login.html";
  } else {
    // console.log(false);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Lỗi !!!",
      text: "Vui lòng kiểm tra lại thông tin đăng ký !!!",
      showConfirmButton: false,
      timer: 2000,
    });
  }
});
