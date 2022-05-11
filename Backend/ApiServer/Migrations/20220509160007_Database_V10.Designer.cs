﻿// <auto-generated />
using System;
using ApiServer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ApiServer.Migrations
{
    [DbContext(typeof(MarshmallowChatContext))]
    [Migration("20220509160007_Database_V10")]
    partial class Database_V10
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.14")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ApiServer.Models.FriendInvitation", b =>
                {
                    b.Property<int>("From")
                        .HasColumnType("int");

                    b.Property<int>("To")
                        .HasColumnType("int");

                    b.Property<string>("DateCreated")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("From", "To");

                    b.HasIndex("To");

                    b.ToTable("FriendInvitation");
                });

            modelBuilder.Entity("ApiServer.Models.Friendship", b =>
                {
                    b.Property<int>("User1Id")
                        .HasColumnType("int");

                    b.Property<int>("User2Id")
                        .HasColumnType("int");

                    b.Property<string>("DateCreated")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("User1Id", "User2Id");

                    b.HasIndex(new[] { "User2Id" }, "IX_Friendship_User2Id");

                    b.ToTable("Friendship");
                });

            modelBuilder.Entity("ApiServer.Models.Message", b =>
                {
                    b.Property<int>("RoomId")
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("nvarchar(1000)");

                    b.Property<string>("DateCreated")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int>("Type")
                        .HasMaxLength(10)
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("RoomId");

                    b.HasIndex(new[] { "UserId" }, "IX_Message_UserId");

                    b.ToTable("Message");
                });

            modelBuilder.Entity("ApiServer.Models.Room", b =>
                {
                    b.Property<int>("RoomId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DateCreated")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("RoomId");

                    b.ToTable("Room");
                });

            modelBuilder.Entity("ApiServer.Models.RoomInfo", b =>
                {
                    b.Property<int>("RoomId")
                        .HasColumnType("int");

                    b.Property<string>("Avatar")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("RoomId");

                    b.ToTable("RoomInfo");
                });

            modelBuilder.Entity("ApiServer.Models.RoomMember", b =>
                {
                    b.Property<int>("RoomId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("RoomId", "UserId");

                    b.HasIndex(new[] { "UserId" }, "IX_Room_Member_UserId");

                    b.ToTable("RoomMember");
                });

            modelBuilder.Entity("ApiServer.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Avatar")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("DateCreated")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<DateTime>("DayOfBirth")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("nvarchar(64)");

                    b.Property<string>("Secret")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("nvarchar(64)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("UserId");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("Username")
                        .IsUnique();

                    b.ToTable("User");
                });

            modelBuilder.Entity("ApiServer.Models.FriendInvitation", b =>
                {
                    b.HasOne("ApiServer.Models.User", "FromUser")
                        .WithMany("FriendInvitation1s")
                        .HasForeignKey("From")
                        .IsRequired();

                    b.HasOne("ApiServer.Models.User", "ToUser")
                        .WithMany("FriendInvitation2s")
                        .HasForeignKey("To")
                        .IsRequired();

                    b.Navigation("FromUser");

                    b.Navigation("ToUser");
                });

            modelBuilder.Entity("ApiServer.Models.Friendship", b =>
                {
                    b.HasOne("ApiServer.Models.User", "User1")
                        .WithMany("FriendshipUser1s")
                        .HasForeignKey("User1Id")
                        .IsRequired();

                    b.HasOne("ApiServer.Models.User", "User2")
                        .WithMany("FriendshipUser2s")
                        .HasForeignKey("User2Id")
                        .IsRequired();

                    b.Navigation("User1");

                    b.Navigation("User2");
                });

            modelBuilder.Entity("ApiServer.Models.Message", b =>
                {
                    b.HasOne("ApiServer.Models.Room", "Room")
                        .WithMany("Messages")
                        .HasForeignKey("RoomId")
                        .IsRequired();

                    b.HasOne("ApiServer.Models.User", "User")
                        .WithMany("Messages")
                        .HasForeignKey("UserId");

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ApiServer.Models.RoomInfo", b =>
                {
                    b.HasOne("ApiServer.Models.Room", "Room")
                        .WithOne("RoomInfo")
                        .HasForeignKey("ApiServer.Models.RoomInfo", "RoomId")
                        .IsRequired();

                    b.Navigation("Room");
                });

            modelBuilder.Entity("ApiServer.Models.RoomMember", b =>
                {
                    b.HasOne("ApiServer.Models.Room", "Room")
                        .WithMany("RoomMembers")
                        .HasForeignKey("RoomId")
                        .IsRequired();

                    b.HasOne("ApiServer.Models.User", "User")
                        .WithMany("RoomMembers")
                        .HasForeignKey("UserId")
                        .IsRequired();

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ApiServer.Models.Room", b =>
                {
                    b.Navigation("Messages");

                    b.Navigation("RoomInfo");

                    b.Navigation("RoomMembers");
                });

            modelBuilder.Entity("ApiServer.Models.User", b =>
                {
                    b.Navigation("FriendInvitation1s");

                    b.Navigation("FriendInvitation2s");

                    b.Navigation("FriendshipUser1s");

                    b.Navigation("FriendshipUser2s");

                    b.Navigation("Messages");

                    b.Navigation("RoomMembers");
                });
#pragma warning restore 612, 618
        }
    }
}
