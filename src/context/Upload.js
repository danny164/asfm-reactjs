import { storage } from '../firebase';

export const uploadImage = (userId, file, progress) => {
    return new Promise((resolve, reject) => {
        // create file reference
        const filePath = `users/${userId}/profile-image`;
        const fileRef = storage.ref().child(filePath);

        // upload task
        const uploadTask = fileRef.put(file);

        uploadTask.on(
            'state_changed',
            (snapshot) => progress(snapshot),
            (error) => reject(error),
            () => {
                resolve(uploadTask.snapshot.ref);
            }
        );
    });
};

export const getDownloadUrl = (userId) => {
    const filePath = `users/${userId}/profile-image`;
    return storage.ref().child(filePath).getDownloadURL();
};
