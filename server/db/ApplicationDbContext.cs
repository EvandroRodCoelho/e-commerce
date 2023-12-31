using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }

    public DbSet<Users> Users { get; set; }
    public DbSet<Product> Products { get; set; }

    public DbSet<ShoppingCartItem> ShoppingCartItems { get; set; }

    public DbSet<OrderItem> OrderItem { get; set; }
}
