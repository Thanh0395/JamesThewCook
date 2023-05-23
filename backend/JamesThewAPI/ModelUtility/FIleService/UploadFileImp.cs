namespace JamesThewAPI.ModelUtility.FIleService
{
	public class UploadFileImp : IFileUpload
	{
		private readonly string _uploadFolder;
		public UploadFileImp(IWebHostEnvironment webHostEnvironment)
        {
			_uploadFolder = Path.Combine(webHostEnvironment.ContentRootPath, "Public");
			if (!Directory.Exists(_uploadFolder))
			{
				Directory.CreateDirectory(_uploadFolder);
			}
		}
        public async Task<bool> DeleteFile(string filePath, string componentPath)
		{
			//File path thuc the cua may
			string filePathDir = _uploadFolder + componentPath;
			//Chuoi can lay la gi
			string targetSubstring = @"Public/Images" + componentPath;
			//cat chuoi filePathDir tu dau start index de cat chuoi
			int startIndex = filePath.IndexOf(targetSubstring);
			// extractedSubstring chuoi sau khi cat duoc
			string extractedSubstring = filePathDir.Substring(startIndex, targetSubstring.Length);
			Console.WriteLine("Extracted Substring: " + extractedSubstring);
			if (extractedSubstring.Length > 0)
			{
				string filePathExist = Path.Combine(filePathDir, filePath.Substring(extractedSubstring.Length + 2));
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
			else
			{
				return false;
			}
		}

		public async Task<string> UploadFile(IFormFile file,string componentPath)
		{
			string extension = Path.GetExtension(file.FileName).ToLower();
			if (extension == ".png" || extension == ".jpg" || extension == ".jfif")
			{
				string fileName = Guid.NewGuid().ToString() + extension;
				//string fileName = Path.GetFileName(file.FileName);
				string filePath = Path.Combine(_uploadFolder + componentPath, fileName);
				using (var stream = new FileStream(filePath, FileMode.Create))
				{
					await file.CopyToAsync(stream);
				}
				return fileName;
			}
			else
			{
				return null;
			}
		}
	}
}
