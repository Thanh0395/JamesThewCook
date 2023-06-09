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
        //test lan nua
        private readonly  IPost _postRepo;
        public PostController(IPost postRepo)
        {
            this._postRepo = postRepo;
        }

        [HttpGet]
        public async Task<ActionResult<CustomRespone<IEnumerable<Post>>>> GetAllPosts()
        {

            try
            {
                var result = await _postRepo.GetAllPostsAsync();
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
        public async Task<ActionResult<CustomRespone<Post>>> GetPost(int pId)
        {
            try
            {
                var result = await _postRepo.GetPostAsync(pId);
                if (result != null)
                {
                    var response = new CustomRespone<Post>(
                                            StatusCodes.Status200OK,
                                            "Get Post by id Successfully!",
                                            result,
                                            null
                                            );
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<Post>(
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
        public async Task<ActionResult<CustomRespone<Post>>> AddPost([FromForm]Post Post, IFormFile? file)
        {
            try
            {
                var result = await _postRepo.AddPostAsync(Post,file);
                if (result != null)
                {
                    var response = new CustomRespone<Post>(
                                     StatusCodes.Status200OK,
                                     "Create Post Successfully!",
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
                        "Cannot create Post"
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
        public async Task<ActionResult<CustomRespone<Post>>> DeletePost(int pId)
        {
            try
            {
                var result = await _postRepo.DeletePostAsync(pId);
                if (result != false)
                {
                    var response = new CustomRespone<Post>(
                             StatusCodes.Status200OK,
                             "Delete Post Successfully!",
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
                            null
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

        [HttpPut]
        public async Task<ActionResult<CustomRespone<Post>>> Update([FromForm]Post Post, IFormFile? file)
        {
            try
            {
                var result = await _postRepo.UpdatePostAsync(Post, file);
                if (result != null)
                {
                    var response = new CustomRespone<Post>(
                         StatusCodes.Status200OK,
                         "Update Post Successfully!",
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
                           "Can not update Post!"
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


        // Hung them vao API GetPostByUserId
        [HttpGet("GetPostByUserId/{uId}")]
        public async Task<ActionResult<CustomRespone<IEnumerable<Post>>>> GetPostByUserId(int uId)
        {
			try
			{
				var resources = await _postRepo.GetPostByUserId(uId);
				if (resources != null)
				{
					var response = new CustomRespone<IEnumerable<Post>>
							(StatusCodes.Status200OK, "GetRecipeFeedbackByRecipeId success!", resources, null);
					return Ok(response);
				}
				else
				{
					var response = new CustomRespone<IEnumerable<Post>>(StatusCodes.Status404NotFound, "Update Recipe Feedback failed!!!!!!", null, null);
					return NotFound(response);
				}
			}
			catch (Exception ex)
			{
				var response = new CustomRespone<IEnumerable<Post>>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
				return BadRequest(response);
			}
		}
	}
}

