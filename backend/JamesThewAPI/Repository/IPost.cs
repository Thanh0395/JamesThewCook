﻿using JamesThewAPI.Entities;

namespace JamesThewAPI.Repository
{
    public interface IPost
    {
        Task<IEnumerable<Post>> GetAllPostsAsync();
        Task<Post> GetPostAsync(int pId);
        Task<Post> AddPostAsync(Post post);
        Task<Post> UpdatePostAsync(Post post);
        Task<bool> DeletePostAsync(int pId);
    }
}
