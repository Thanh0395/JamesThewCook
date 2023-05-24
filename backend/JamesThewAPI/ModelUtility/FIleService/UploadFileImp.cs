namespace JamesThewAPI.ModelUtility.FIleService
{
	public class UploadFileImp : IFileUpload
	{
		private readonly string _uploadFolder;
		public UploadFileImp(IWebHostEnvironment webHostEnvironment)
        {
			_uploadFolder = Path.Combine(webHostEnvironment.ContentRootPath, "Public/Uploads");
			if (!Directory.Exists(_uploadFolder))
			{
				Directory.CreateDirectory(_uploadFolder);
			}
		}
        public async Task<bool> DeleteFile(string filePath)
		{
			string filePathExist = Path.Combine(_uploadFolder, filePath.Substring(16));
			if (!string.IsNullOrEmpty(filePath))
			{
				if (File.Exists(filePathExist))
				{
					File.Delete(filePathExist);
					return true;
				}
				else
				{
					return false;
				}
			}
			else
			{
				return false;
			}
		}

		public async Task<string> UploadFile(IFormFile file)
		{
			string extension = Path.GetExtension(file.FileName).ToLower();
			if (extension != ".png")
			{
				return null;
			}
			else
			{
				string fileName = Guid.NewGuid().ToString() + extension;
				//string fileName = Path.GetFileName(file.FileName);
				string filePath = Path.Combine(_uploadFolder, fileName);
				using (var stream = new FileStream(filePath, FileMode.Create))
				{
					await file.CopyToAsync(stream);
				}
				return fileName;
			}
		}
	}
}
