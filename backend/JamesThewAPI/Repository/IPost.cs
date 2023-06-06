using JamesThewAPI.Entities;

namespace JamesThewAPI.Repository
{
    public interface IPost
    {
        Task<IEnumerable<Post>> GetAllPostsAsync();
        Task<Post> GetPostAsync(int pId);
        Task<Post> AddPostAsync(Post post, IFormFile file);
        Task<Post> UpdatePostAsync(Post post, IFormFile file);
        Task<bool> DeletePostAsync(int pId);

        Task<string> GetUserNameAsync(int uId);
    }
}
