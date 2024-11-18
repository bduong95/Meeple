namespace MeepleAPI.Models
{
    public class Game
    {
        public string GameId { get; set; }
        public string Name { get; set; }
        public string Genre { get; set; }
        public string DifficultyLevel { get; set; }
        public string PlayStyle { get; set; }
        public int Players { get; set; }
        public double BoardGameArenaRating { get; set; }
    }
}
