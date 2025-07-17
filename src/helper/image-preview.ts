export const previewImage = (files: any) => {
	if (typeof files === "string") return files;

	const file = files;

	return URL?.createObjectURL(file);
};
