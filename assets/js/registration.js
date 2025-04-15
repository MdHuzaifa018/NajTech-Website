document.addEventListener('DOMContentLoaded', function() {
  const registrationForm = document.getElementById('registrationForm');

  registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const fullName = document.getElementById('fullName').value;
    const registrationNo = document.getElementById('registrationNo').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const course = document.getElementById('course').value;

    // Create student data object
    const studentData = {
      fullName: fullName,
      registrationNo: registrationNo,
      email: email,
      phone: phone,
      course: course,
      registrationDate: firebase.firestore.FieldValue.serverTimestamp()
    };

    // Save to Firestore
    db.collection('students').add(studentData)
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
        alert('Registration successful!');
        registrationForm.reset();
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
        alert('Error during registration. Please try again.');
      });
  });
}); 