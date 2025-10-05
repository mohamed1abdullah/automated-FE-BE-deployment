document.addEventListener('DOMContentLoaded', () => {
    const profileView = document.getElementById('profile-view');
    const editView = document.getElementById('edit-view');
    const editBtn = document.getElementById('edit-btn');
    const saveBtn = document.getElementById('save-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    console.log('editBtn:', editBtn);
    console.log('saveBtn:', saveBtn);
    console.log('cancelBtn:', cancelBtn);

    async function loadProfile() {
        try {
            const res = await fetch("http://localhost:3000/api/profile");
            if (!res.ok) throw new Error('Network response not ok');
            const data = await res.json();

            document.getElementById('name').textContent = data.name || '—';
            document.getElementById('view-name').textContent = data.name || '—';
            document.getElementById('view-phone').textContent = data.phone || '—';
            document.getElementById('view-email').textContent = data.email || '—';
            document.getElementById('view-linkedin').textContent = data.linkedin || '—';
            document.getElementById('view-linkedin').href = data.linkedin || '#';

            document.getElementById('name-input').value = data.name || '';
            document.getElementById('phone-input').value = data.phone || '';
            document.getElementById('email-input').value = data.email || '';
            document.getElementById('linkedin-input').value = data.linkedin || '';
        } catch (err) {
            console.error(err);
            document.getElementById('name').textContent = 'Error while loading data';
        }
    }

    async function updateProfile() {
        const name = document.getElementById('name-input').value;
        const phone = document.getElementById('phone-input').value;
        const email = document.getElementById('email-input').value;
        const linkedin = document.getElementById('linkedin-input').value;

        try {
            const res = await fetch("http://localhost:3000/api/profile", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, phone, email, linkedin })
            });

            if (!res.ok) throw new Error('Network response not ok');

            const data = await res.json();
            console.log(data.message);
            await loadProfile(); // Reload profile to show updated data
            showProfileView();
        } catch (err) {
            console.error(err);
            alert('Error updating profile');
        }
    }

    function showEditView() {
        profileView.style.display = 'none';
        editView.style.display = 'block';
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
    }

    function showProfileView() {
        profileView.style.display = 'block';
        editView.style.display = 'none';
        editBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
    }

    editBtn.addEventListener('click', showEditView);
    saveBtn.addEventListener('click', updateProfile);
    cancelBtn.addEventListener('click', showProfileView);

    loadProfile();
});
