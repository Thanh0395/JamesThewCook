namespace JamesThewAPI.ModelUtility.FIleService
{
	public interface IFileUpload
	{
		Task<string> UploadFile(IFormFile file);

		Task<bool> DeleteFile(string filePath);
	}
}
