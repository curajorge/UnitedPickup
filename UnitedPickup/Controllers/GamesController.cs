using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace YourAppName.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private static List<Game> games = new List<Game>();

        [HttpPost]
        public IActionResult CreateGame([FromBody] GameRequest gameRequest)
        {
            // create a new game with the given name, player limit, and number of players playing
            var game = new Game
            {
                Name = gameRequest.Name,
                TotalPlayers = gameRequest.TotalPlayers,
                PlayersPlaying = gameRequest.PlayersPlaying
            };
            games.Add(game);

            // return the ID of the newly created game
            return Ok(new { GameId = game.Id });
        }

        [HttpPost("{id}/players")]
        public IActionResult AddPlayerToGame(int id, [FromBody] PlayerRequest playerRequest)
        {
            // find the game with the given ID
            var game = games.Find(g => g.Id == id);
            if (game == null)
            {
                return NotFound();
            }

            // add the player to the game
            if (game.Players.Count < game.PlayersPlaying)
            {
                var player = new Player
                {
                    Name = playerRequest.Name,
                    Contact = playerRequest.Contact
                };
                game.Players.Add(player);

                // return the ID of the newly added player
                return Ok(new { PlayerId = player.Id });
            }
            else
            {
                return BadRequest("The game is already full.");
            }
        }
    }
}

public class Game
{
    private static int _idCounter = 1;

    public int Id { get; private set; }
    public string Name { get; set; }
    public int TotalPlayers { get; set; }
    public int PlayersPlaying { get; set; }
    public List<Player> Players { get; set; }

    public Game()
    {
        Id = _idCounter++;
        Players = new List<Player>();
    }
}

public class Player
{
    private static int _idCounter = 1;

    public int Id { get; private set; }
    public string Name { get; set; }
    public string Contact { get; set; }

    public Player()
    {
        Id = _idCounter++;
    }
}


public class GameRequest
{
    public string Name { get; set; }
    public int TotalPlayers { get; set; }
    public int PlayersPlaying { get; set; }
}

public class PlayerRequest
{
    public string Name { get; set; }
    public string Contact { get; set; }
}
