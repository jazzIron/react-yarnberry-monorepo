export const fileDownload = async (response: any, id: string, fileName: string) => {
  const fileData = new File([response.data], fileName);
  const reader = new FileReader();
  reader.onload = (ev) => {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(response);
    link.setAttribute('download', fileName);
    link.style.cssText = 'display:none';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  reader.readAsDataURL(fileData);
};
