using Microsoft.EntityFrameworkCore.Migrations;

namespace ApiServer.Migrations
{
    public partial class Database_V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Room_Info_Room_RoomId",
                table: "Room_Info");

            migrationBuilder.DropForeignKey(
                name: "FK_Room_Member_Room_RoomId",
                table: "Room_Member");

            migrationBuilder.DropForeignKey(
                name: "FK_Room_Member_User_UserId",
                table: "Room_Member");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Room_Member",
                table: "Room_Member");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Room_Info",
                table: "Room_Info");

            migrationBuilder.RenameTable(
                name: "Room_Member",
                newName: "RoomMember");

            migrationBuilder.RenameTable(
                name: "Room_Info",
                newName: "RoomInfo");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoomMember",
                table: "RoomMember",
                columns: new[] { "RoomId", "UserId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoomInfo",
                table: "RoomInfo",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomInfo_Room_RoomId",
                table: "RoomInfo",
                column: "RoomId",
                principalTable: "Room",
                principalColumn: "RoomId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomMember_Room_RoomId",
                table: "RoomMember",
                column: "RoomId",
                principalTable: "Room",
                principalColumn: "RoomId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomMember_User_UserId",
                table: "RoomMember",
                column: "UserId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomInfo_Room_RoomId",
                table: "RoomInfo");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomMember_Room_RoomId",
                table: "RoomMember");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomMember_User_UserId",
                table: "RoomMember");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoomMember",
                table: "RoomMember");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoomInfo",
                table: "RoomInfo");

            migrationBuilder.RenameTable(
                name: "RoomMember",
                newName: "Room_Member");

            migrationBuilder.RenameTable(
                name: "RoomInfo",
                newName: "Room_Info");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Room_Member",
                table: "Room_Member",
                columns: new[] { "RoomId", "UserId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Room_Info",
                table: "Room_Info",
                column: "RoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Room_Info_Room_RoomId",
                table: "Room_Info",
                column: "RoomId",
                principalTable: "Room",
                principalColumn: "RoomId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Room_Member_Room_RoomId",
                table: "Room_Member",
                column: "RoomId",
                principalTable: "Room",
                principalColumn: "RoomId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Room_Member_User_UserId",
                table: "Room_Member",
                column: "UserId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
