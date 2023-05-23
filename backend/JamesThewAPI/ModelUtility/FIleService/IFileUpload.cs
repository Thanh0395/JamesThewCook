namespace JamesThewAPI.ModelUtility.FIleService
{
	public interface IFileUpload
	{
		Task<string> UploadFile(IFormFile file, string componentPath);

		Task<bool> DeleteFile(string filePath, string componentPath);
	}
}
