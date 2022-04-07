using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ApiServer.Migrations
{
    public partial class Database_V6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Secret",
                table: "User",
                type: "nvarchar(64)",
                maxLength: 64,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(64)",
                oldMaxLength: 64,
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "FriendInvitations",
                columns: table => new
                {
                    User1Id = table.Column<int>(type: "int", nullable: false),
                    User2Id = table.Column<int>(type: "int", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FriendInvitations", x => new { x.User1Id, x.User2Id });
                    table.ForeignKey(
                        name: "FK_FriendInvitations_User_User1Id",
                        column: x => x.User1Id,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FriendInvitations_User_User2Id",
                        column: x => x.User2Id,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FriendInvitations_User2Id",
                table: "FriendInvitations",
                column: "User2Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FriendInvitations");

            migrationBuilder.AlterColumn<string>(
                name: "Secret",
                table: "User",
                type: "nvarchar(64)",
                maxLength: 64,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(64)",
                oldMaxLength: 64);
        }
    }
}
