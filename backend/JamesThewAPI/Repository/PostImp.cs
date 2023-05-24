using JamesThewAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace JamesThewAPI.Repository
{
    public class PostImp : IPost
    {
        //test push 
        private readonly ProjectS3Context _context;
        public PostImp(ProjectS3Context context)
        {
            this._context = context;
        }
        public async Task<Post> AddPostAsync(Post post)
        {
            if(post != null)
            {
                await _context.Posts.AddAsync(post);
                await _context.SaveChangesAsync();
                return post;
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> DeletePostAsync(int pId)
        {
            var postDB = await _context.Posts.FindAsync(pId);
            if(postDB != null)
            {
                _context.Posts.Remove(postDB);
                await _context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<IEnumerable<Post>> GetAllPostsAsync()
        {
            return await _context.Posts.ToListAsync();
        }

        public async Task<Post> GetPostAsync(int pId)
        {
            var postDB = await _context.Posts.FindAsync(pId);
            //if( postDB != null)
            //{
            //    return postDB;
            //}
            //else
            //{
            //    return null;
            //}
            return (postDB != null) ? postDB : null;
        }

        public async Task<Post> UpdatePostAsync(Post post)
        {
            var postDB = await _context.Posts.FindAsync(post.PId);
            if(postDB != null)
            {
                _context.Entry(post).State = EntityState.Modified;
                await _context.SaveChangesAsync();  
                return post;
            }
            else
            {
                return null;
            }
        }
    }
}
