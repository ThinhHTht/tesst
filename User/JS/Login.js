const loginEmail = document.querySelector("#email");
const loginPassword = document.querySelector("#password");
const loginForm = document.querySelector("form");
const fromLocal = JSON.parse(localStorage.getItem("userData"));
console.log(fromLocal);
console.log(fromLocal[0].email);
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

// Hàm check length của input (username, password)
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

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isEmptyError = checkEmptyError([loginEmail, loginPassword]);

  let isEmailError = checkEmailError(loginEmail);
  let isPasswordLengthError = checkLengthError(
    loginPassword,
    "Password",
    8,
    25
  );

  if (!isEmptyError && !isEmailError && !isPasswordLengthError) {
    for (let j = 0; j < fromLocal.length; j++) {
      if (
        loginEmail.value === fromLocal[j].email &&
        loginPassword.value === fromLocal[j].password
      ) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Bạn có thể sử dụng app ngay bây giờ !!!",
          showConfirmButton: false,
          timer: 2000,
        });
        window.location.href = "index.html";
        break;
      }
    }
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
