using MeepleAPI.Models; // Import the Game model namespace
using MeepleAPI.Repositories; // Import the GamesRepository and IGamesRepository namespace
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MeepleAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly IGamesRepository _gamesRepository;

        public GamesController(IGamesRepository gamesRepository)
        {
            _gamesRepository = gamesRepository;
        }

        // GET: api/games
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetAllGames()
        {
            var games = await _gamesRepository.GetAllGamesAsync();
            return Ok(games);
        }

        // GET: api/games/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGameById(string id)
        {
            var game = await _gamesRepository.GetGameByIdAsync(id);
            if (game == null)
            {
                return NotFound();
            }
            return Ok(game);
        }

        // POST: api/games
        [HttpPost]
        public async Task<ActionResult> AddGame([FromBody] Game game)
        {
            await _gamesRepository.AddGameAsync(game);
            return CreatedAtAction(nameof(GetGameById), new { id = game.GameId }, game);
        }

        // PUT: api/games/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateGame(string id, [FromBody] Game game)
        {
            var existingGame = await _gamesRepository.GetGameByIdAsync(id);
            if (existingGame == null)
            {
                return NotFound();
            }

            await _gamesRepository.UpdateGameAsync(id, game);
            return NoContent();
        }

        // DELETE: api/games/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGame(string id)
        {
            var existingGame = await _gamesRepository.GetGameByIdAsync(id);
            if (existingGame == null)
            {
                return NotFound();
            }

            await _gamesRepository.DeleteGameAsync(id);
            return NoContent();
        }

        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<Game>>> GetFilteredGames(
    [FromQuery] string? genre,
    [FromQuery] string? difficultyLevel,
    [FromQuery] string? sortBy)
        {
            var games = await _gamesRepository.GetFilteredGamesAsync(genre, difficultyLevel, sortBy);
            return Ok(games);
        }

    }
}
