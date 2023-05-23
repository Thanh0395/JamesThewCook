using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.CustomResult;
using JamesThewAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;

namespace JamesThewAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPost _postRepo;
        public PostController(IPost postRepo)
        {
            this._postRepo = postRepo;
        }
        [HttpGet]
        public async Task<ActionResult<CustomRespone<IEnumerable<Post>>>> GetAllPosts()
        {
            try
            {
                var result = await _postRepo.GetAllPosts();
                if (result != null)
                {
                    var response = new CustomRespone<IEnumerable<Post>>(
                        StatusCodes.Status200OK,
                        "Get List Posts Successfully!",
                        result,
                        null
                        );
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<IEnumerable<Post>>(
                        StatusCodes.Status404NotFound,
                        "Get List Posts Failed!",
                        null,
                        null
                        );
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<IEnumerable<Post>>(
                      StatusCodes.Status500InternalServerError,
                      "System Error!",
                      null,
                      ex.Message
                      );
                return BadRequest(response);
            }
        }

        [HttpGet("{pId}")]
        public async Task<ActionResult<CustomRespone<Post>>> GetPost(int pId) {
            try
            {
                var result = await _postRepo.GetPost(pId);
                if (result != null)
                {
                    var response = new CustomRespone<Post>(
                        StatusCodes.Status200OK,
                        "Get Post Done!",
                        result,
                        null
                        );
                    return Ok(response);
                }
                else
                {
                   var response = new CustomRespone<Post>(
                       StatusCodes.Status404NotFound,
                       "Get Post Undone!",
                       null,
                       "Cannot get post by pId"
                       );
                    return NotFound(response );
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<Post>(
                  StatusCodes.Status500InternalServerError,
                  "System Error!",
                  null,
                  ex.Message
                  );
                return BadRequest(response);
            }
        }

        [HttpPut]
        public async Task<ActionResult<CustomRespone<Post>>> UpdatePost(Post post)
        {
            try
            {
                var result = await _postRepo.UpdatePost(post);
                if (result != null)
                {
                    var response = new CustomRespone<Post>(
                        StatusCodes.Status200OK,
                        "Update Post Done!",
                        result,
                        null
                        );
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<Post>(
                        StatusCodes.Status404NotFound,
                        "Update Post Undone!",
                        null,
                        "Cannot update post by post"
                        );
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<Post>(
                  StatusCodes.Status500InternalServerError,
                  "System Error!",
                  null,
                  ex.Message
                  );
                return BadRequest(response);
            }
        }

        [HttpPost]
        public async Task<ActionResult<CustomRespone<Post>>> CreatePost(Post post)
        {
            try
            {
                var result = await _postRepo.AddPost(post);
                if (result != null)
                {
                    var response = new CustomRespone<Post>(
                        StatusCodes.Status200OK,
                        "Create Post Done!",
                        result,
                        null
                        );
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<Post>(
                        StatusCodes.Status404NotFound,
                        "Create Post Undone!",
                        null,
                        "Cannot create post by post"
                        );
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<Post>(
                  StatusCodes.Status500InternalServerError,
                  "System Error!",
                  null,
                  ex.Message
                  );
                return BadRequest(response);
            }
        }
        [HttpDelete("{pId}")]
        public async Task<ActionResult<CustomRespone<Post>>> Delete(int pId)
        {
            try
            {
                var result = await _postRepo.DeletePost(pId);
                if (result != false)
                {
                    var response = new CustomRespone<Post>(
                        StatusCodes.Status200OK,
                        "Delete Post Done!",
                        null,
                        null
                        );
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<Post>(
                        StatusCodes.Status404NotFound,
                        "Delete Post Undone!",
                        null,
                        "Cannot Delete post by pId"
                        );
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<Post>(
                  StatusCodes.Status500InternalServerError,
                  "System Error!",
                  null,
                  ex.Message
                  );
                return BadRequest(response);
            }
        }
    }
}
