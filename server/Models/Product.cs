public class Product
{
    public int Id { get; set; }
    public required string name { get; set; }
    public required string description { get; set; }
    public required int quantity { get; set; }
    public required double price { get; set; }

    public required string brand { get; set; }

    public required string technical_specification { get; set; }
}
