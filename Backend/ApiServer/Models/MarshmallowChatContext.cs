using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ApiServer.Models
{
    public partial class MarshmallowChatContext : DbContext
    {
        public MarshmallowChatContext()
        {
        }

        public MarshmallowChatContext(DbContextOptions<MarshmallowChatContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Friendship> Friendships { get; set; }
        public virtual DbSet<Message> Messages { get; set; }
        public virtual DbSet<Room> Rooms { get; set; }
        public virtual DbSet<RoomInfo> RoomInfos { get; set; }
        public virtual DbSet<RoomMember> RoomMembers { get; set; }
        public virtual DbSet<User> Users { get; set; }

        public void CreateTempData()
        {
            MarshmallowChatContext Db = new MarshmallowChatContext();
            //Db.Database.EnsureDeleted();
            if (true)
            {
                List<User> lstUser = new List<User>(){
                new User(){
                    Avatar = null,
                    DateCreated = System.DateTime.Now,
                    DayOfBirth = new System.DateTime(2000, 10, 10),
                    Email = "baob1809327@gmail.com",
                    FirstName = "Nguyễn Chí",
                    LastName = "Bảo",
                    Gender = "Nam",
                    Username = "Nguyenbao1403",
                    Password = "14032017"
                },
                new User(){
                    Avatar = null,
                    DateCreated = System.DateTime.Now,
                    DayOfBirth = new System.DateTime(2000, 10, 10),
                    Email = "baob1809327@gmail.com",
                    FirstName = "Nguyễn Chí",
                    LastName = "Bảo Hi",
                    Gender = "Nam",
                    Username = "Nguyenbao2017",
                    Password = "14032017"
                }
            };
                lstUser.ForEach(user =>
                {
                    Db.Users.Add(user);
                    Db.SaveChanges();
                });
                //
                Friendship friendship = new Friendship()
                {
                    DateCreated = System.DateTime.Now,
                    User1Id = 1,
                    User2Id = 2,
                };
                Db.Friendships.Add(friendship);
                Db.SaveChanges();
                //
                Room room = new Room()
                {
                    Type = "Normal"
                };
                Db.Rooms.Add(room);
                Db.SaveChanges();
                //
                RoomMember roomMember = new RoomMember()
                {
                    RoomId = 1,
                    UserId = 1
                };
                RoomMember roomMember2 = new RoomMember()
                {
                    RoomId = 1,
                    UserId = 2
                };
                Db.RoomMembers.Add(roomMember);
                Db.RoomMembers.Add(roomMember2);
                Db.SaveChanges();
                //
                List<Message> lstMessage = new List<Message>(){
                    new Message(){
                        RoomId = 1,
                        TimeCreated = System.DateTime.Now,
                        Type = "Text",
                        UserId = 1,
                        Content = "Chào bạn tôi là Nguyễn Chí Bảo, rất vui được làm quen với bạn."
                    },
                    new Message(){
                        RoomId = 1,
                        TimeCreated = System.DateTime.Now,
                        Type = "Text",
                        UserId = 2,
                        Content = "Chào bạn tôi là Nguyễn Chí Bảo Hi, rất vui được làm quen với bạn."
                    }
                };
                lstMessage.ForEach(message =>
                {
                    Db.Messages.Add(message);
                    Db.SaveChanges();
                });
            }
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=127.0.0.1,1433;Database=MarshmallowChat;UID=sa;PWD=14032017");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Friendship>(entity =>
            {
                entity.HasKey(e => new { e.User1Id, e.User2Id });

                entity.ToTable("Friendship");

                entity.HasIndex(e => e.User2Id, "IX_Friendship_User2Id");

                entity.HasOne(d => d.User1)
                    .WithMany(p => p.FriendshipUser1s)
                    .HasForeignKey(d => d.User1Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.User2)
                    .WithMany(p => p.FriendshipUser2s)
                    .HasForeignKey(d => d.User2Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Message>(entity =>
            {
                entity.HasKey(e => new { e.RoomId, e.MessageId });

                entity.ToTable("Message");

                entity.HasIndex(e => e.UserId, "IX_Message_UserId");

                entity.Property(e => e.MessageId).ValueGeneratedOnAdd();

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.HasOne(d => d.Room)
                    .WithMany(p => p.Messages)
                    .HasForeignKey(d => d.RoomId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Messages)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity.ToTable("Room");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(10);
            });

            modelBuilder.Entity<RoomInfo>(entity =>
            {
                entity.HasKey(e => e.RoomId);

                entity.ToTable("RoomInfo");

                entity.Property(e => e.RoomId).ValueGeneratedNever();

                entity.Property(e => e.Avatar).HasMaxLength(100);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.HasOne(d => d.Room)
                    .WithOne(p => p.RoomInfo)
                    .HasForeignKey<RoomInfo>(d => d.RoomId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<RoomMember>(entity =>
            {
                entity.HasKey(e => new { e.RoomId, e.UserId });

                entity.ToTable("RoomMember");

                entity.HasIndex(e => e.UserId, "IX_Room_Member_UserId");

                entity.HasOne(d => d.Room)
                    .WithMany(p => p.RoomMembers)
                    .HasForeignKey(d => d.RoomId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.RoomMembers)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.Avatar).HasMaxLength(100);

                entity.Property(e => e.DateCreated).HasColumnType("datetime");

                entity.Property(e => e.DayOfBirth).HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(64);

                entity.HasIndex(e => e.Username).IsUnique();

                entity.HasIndex(e => e.Email).IsUnique();

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
