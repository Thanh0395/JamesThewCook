using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.FIleService;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace JamesThewAPI.Repository
{
    public class PostImp : IPost
    {
        //test push 
        private readonly IFileUpload _formFile;   
        private readonly ProjectS3Context _context;
        private string componentPath = "/Images/Post";

        public PostImp(ProjectS3Context context, IFileUpload formFile)
        {
            this._context = context;
            this._formFile = formFile;
        }
        public async Task<Post> AddPostAsync(Post post, IFormFile file)
        {
            if(post != null) { 
                if (file != null)
                {
                    var fileName = await _formFile.UploadFile(file, componentPath);
                    if (fileName != null)
                    {
                        post.FeatureImage = "/Public" + componentPath + "/" + fileName;
                    }
                    else
                    {
                        post.FeatureImage = "defaultImage";
                    }
                }
                else
                {
                    post.FeatureImage = "/Public" + componentPath + "/" + "defaultavt.png";
                }
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

        public async Task<Post> UpdatePostAsync(Post post, IFormFile file)
        {
            var postDB = await _context.Posts.FindAsync(post.PId);
            if (postDB != null) { 
                if (file != null)
                {
                    var fileName = await _formFile.UploadFile(file, componentPath);
                    if (fileName != null)
                    {
                        post.FeatureImage = "/Public" + componentPath + "/" + fileName;
                    }
                    else
                    {
                        post.FeatureImage = "defaultImage";
                    }
                }
                else
                {
                    post.FeatureImage = "/Public" + componentPath + "/" + "defaultavt.png";
                }
            _context.Entry(post).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return post;
        }
            else
            {
                return null;
            }
        }

		// Hung Them vao API GetPostByUserId
        public async Task<IEnumerable<Post>> GetPostByUserId(int uId)
        {
			return await _context.Posts
			.Where(p => p.UId == uId)
			.ToListAsync();
		}
	}
}
