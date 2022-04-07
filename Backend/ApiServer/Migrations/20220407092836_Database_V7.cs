using Microsoft.EntityFrameworkCore.Migrations;

namespace ApiServer.Migrations
{
    public partial class Database_V7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FriendInvitations_User_User1Id",
                table: "FriendInvitations");

            migrationBuilder.DropForeignKey(
                name: "FK_FriendInvitations_User_User2Id",
                table: "FriendInvitations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FriendInvitations",
                table: "FriendInvitations");

            migrationBuilder.RenameTable(
                name: "FriendInvitations",
                newName: "FriendInvitation");

            migrationBuilder.RenameColumn(
                name: "User2Id",
                table: "FriendInvitation",
                newName: "To");

            migrationBuilder.RenameColumn(
                name: "User1Id",
                table: "FriendInvitation",
                newName: "From");

            migrationBuilder.RenameIndex(
                name: "IX_FriendInvitations_User2Id",
                table: "FriendInvitation",
                newName: "IX_FriendInvitation_To");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FriendInvitation",
                table: "FriendInvitation",
                columns: new[] { "From", "To" });

            migrationBuilder.AddForeignKey(
                name: "FK_FriendInvitation_User_From",
                table: "FriendInvitation",
                column: "From",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FriendInvitation_User_To",
                table: "FriendInvitation",
                column: "To",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FriendInvitation_User_From",
                table: "FriendInvitation");

            migrationBuilder.DropForeignKey(
                name: "FK_FriendInvitation_User_To",
                table: "FriendInvitation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FriendInvitation",
                table: "FriendInvitation");

            migrationBuilder.RenameTable(
                name: "FriendInvitation",
                newName: "FriendInvitations");

            migrationBuilder.RenameColumn(
                name: "To",
                table: "FriendInvitations",
                newName: "User2Id");

            migrationBuilder.RenameColumn(
                name: "From",
                table: "FriendInvitations",
                newName: "User1Id");

            migrationBuilder.RenameIndex(
                name: "IX_FriendInvitation_To",
                table: "FriendInvitations",
                newName: "IX_FriendInvitations_User2Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FriendInvitations",
                table: "FriendInvitations",
                columns: new[] { "User1Id", "User2Id" });

            migrationBuilder.AddForeignKey(
                name: "FK_FriendInvitations_User_User1Id",
                table: "FriendInvitations",
                column: "User1Id",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FriendInvitations_User_User2Id",
                table: "FriendInvitations",
                column: "User2Id",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
