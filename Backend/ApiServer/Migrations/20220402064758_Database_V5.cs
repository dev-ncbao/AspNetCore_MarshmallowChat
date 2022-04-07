using Microsoft.EntityFrameworkCore.Migrations;

namespace ApiServer.Migrations
{
    public partial class Database_V5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Secret",
                table: "User",
                type: "nvarchar(64)",
                maxLength: 64,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Secret",
                table: "User");
        }
    }
}
