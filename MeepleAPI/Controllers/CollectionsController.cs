using MeepleAPI.Models;
using MeepleAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MeepleAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CollectionsController : ControllerBase
    {
        private readonly ICollectionsRepository _collectionsRepository;

        public CollectionsController(ICollectionsRepository collectionsRepository)
        {
            _collectionsRepository = collectionsRepository;
        }

        [HttpPost("{userId}/add/{gameId}")]
        public async Task<IActionResult> AddToCollection(string userId, string gameId)
        {
            await _collectionsRepository.AddToCollectionAsync(userId, gameId);
            return Ok();
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Game>>> GetCollection(string userId)
        {
            var collection = await _collectionsRepository.GetCollectionAsync(userId);
            return Ok(collection);
        }

        [HttpDelete("{userId}/remove/{gameId}")]
        public async Task<IActionResult> RemoveFromCollection(string userId, string gameId)
        {
            await _collectionsRepository.RemoveFromCollectionAsync(userId, gameId);
            return NoContent();
        }
    }

}
