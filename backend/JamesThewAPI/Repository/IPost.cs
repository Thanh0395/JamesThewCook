using JamesThewAPI.Entities;

namespace JamesThewAPI.Repository
{
    public interface IPost
    {
        Task<IEnumerable<Post>> GetAllPosts();
        Task<Post> GetPost(int pId);
        Task<Post> AddPost(Post post);
        Task<Post> UpdatePost(Post post);
        Task<bool> DeletePost(int pId);
    }
}
