using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace JamesThewAPI.Entities
{
    public partial class ProjectS3Context : DbContext
    {
        public ProjectS3Context()
        {
        }

        public ProjectS3Context(DbContextOptions<ProjectS3Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Contest> Contests { get; set; } = null!;
        public virtual DbSet<Country> Countries { get; set; } = null!;
        public virtual DbSet<Faq> Faqs { get; set; } = null!;
        public virtual DbSet<Feedback> Feedbacks { get; set; } = null!;
        public virtual DbSet<Membership> Memberships { get; set; } = null!;
        public virtual DbSet<Post> Posts { get; set; } = null!;
        public virtual DbSet<Rating> Ratings { get; set; } = null!;
        public virtual DbSet<Recipe> Recipes { get; set; } = null!;
        public virtual DbSet<RecipeFeedback> RecipeFeedbacks { get; set; } = null!;
        public virtual DbSet<SubmissionContest> SubmissionContests { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=.;Database=ProjectS3;User Id=sa;password=123;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.CId)
                    .HasName("PK_C_id");

                entity.ToTable("Category");

                entity.Property(e => e.CId)
                    .ValueGeneratedNever()
                    .HasColumnName("C_id");

                entity.Property(e => e.CategoryName).HasMaxLength(50);
            });

            modelBuilder.Entity<Contest>(entity =>
            {
                entity.ToTable("Contest");

                entity.Property(e => e.ContestId).HasColumnName("Contest_id");

                entity.Property(e => e.Description).HasMaxLength(1000);

                entity.Property(e => e.FeatureImage).HasMaxLength(200);

                entity.Property(e => e.Prize).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.StartDate).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Title).HasMaxLength(100);

                entity.HasOne(d => d.WinnerNavigation)
                    .WithMany(p => p.Contests)
                    .HasForeignKey(d => d.Winner)
                    .HasConstraintName("FK__Contest__Winner__4BAC3F29");
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.ToTable("Country");

                entity.Property(e => e.CountryId).HasColumnName("Country_id");

                entity.Property(e => e.CountryName).HasMaxLength(50);
            });

            modelBuilder.Entity<Faq>(entity =>
            {
                entity.ToTable("FAQ");

                entity.Property(e => e.FaqId).HasColumnName("FAQ_id");

                entity.Property(e => e.Asked).HasMaxLength(500);

                entity.Property(e => e.Question).HasMaxLength(200);
            });

            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.HasKey(e => e.FbId)
                    .HasName("PK_FB_id");

                entity.ToTable("Feedback");

                entity.Property(e => e.FbId).HasColumnName("FB_id");

                entity.Property(e => e.Content).HasMaxLength(2000);

                entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.PId).HasColumnName("P_id");

                entity.Property(e => e.UId).HasColumnName("U_id");

                entity.HasOne(d => d.PIdNavigation)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.PId)
                    .HasConstraintName("FK__Feedback__P_id__3F466844");

                entity.HasOne(d => d.UIdNavigation)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.UId)
                    .HasConstraintName("FK__Feedback__U_id__3E52440B");
            });

            modelBuilder.Entity<Membership>(entity =>
            {
                entity.HasKey(e => e.MsId)
                    .HasName("PK_MS_id");

                entity.ToTable("Membership");

                entity.Property(e => e.MsId).HasColumnName("MS_id");

                entity.Property(e => e.IsMembership).HasDefaultValueSql("((0))");

                entity.Property(e => e.UId).HasColumnName("U_id");

                entity.HasOne(d => d.UIdNavigation)
                    .WithMany(p => p.Memberships)
                    .HasForeignKey(d => d.UId)
                    .HasConstraintName("FK__Membership__U_id__47DBAE45");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.HasKey(e => e.PId)
                    .HasName("PK_P_id");

                entity.ToTable("Post");

                entity.Property(e => e.PId).HasColumnName("P_id");

                entity.Property(e => e.CId)
                    .HasColumnName("C_id")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FeatureImage).HasMaxLength(200);

                entity.Property(e => e.IsFree).HasDefaultValueSql("((0))");

                entity.Property(e => e.Title).HasMaxLength(200);

                entity.Property(e => e.Type)
                    .HasMaxLength(100)
                    .HasDefaultValueSql("('tips')");

                entity.Property(e => e.UId).HasColumnName("U_id");

                entity.HasOne(d => d.CIdNavigation)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.CId)
                    .HasConstraintName("FK__Post__C_id__32E0915F");

                entity.HasOne(d => d.UIdNavigation)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.UId)
                    .HasConstraintName("FK__Post__U_id__31EC6D26");
            });

            modelBuilder.Entity<Rating>(entity =>
            {
                entity.ToTable("Rating");

                entity.Property(e => e.RatingId).HasColumnName("Rating_id");

                entity.Property(e => e.ScId).HasColumnName("SC_id");

                entity.Property(e => e.Score).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.UId).HasColumnName("U_id");

                entity.HasOne(d => d.Sc)
                    .WithMany(p => p.Ratings)
                    .HasForeignKey(d => d.ScId)
                    .HasConstraintName("FK__Rating__SC_id__5441852A");

                entity.HasOne(d => d.UIdNavigation)
                    .WithMany(p => p.Ratings)
                    .HasForeignKey(d => d.UId)
                    .HasConstraintName("FK__Rating__U_id__534D60F1");
            });

            modelBuilder.Entity<Recipe>(entity =>
            {
                entity.HasKey(e => e.RId)
                    .HasName("PK_Recipe_id");

                entity.ToTable("Recipe");

                entity.Property(e => e.RId).HasColumnName("R_id");

                entity.Property(e => e.CId)
                    .HasColumnName("C_id")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.CountryId).HasColumnName("Country_id");

                entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FeatureImage).HasMaxLength(200);

                entity.Property(e => e.Ingredient).HasMaxLength(500);

                entity.Property(e => e.IsFree).HasDefaultValueSql("((0))");

                entity.Property(e => e.Title).HasMaxLength(200);

                entity.Property(e => e.UId).HasColumnName("U_id");

                entity.HasOne(d => d.CIdNavigation)
                    .WithMany(p => p.Recipes)
                    .HasForeignKey(d => d.CId)
                    .HasConstraintName("FK__Recipe__C_id__398D8EEE");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Recipes)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("FK__Recipe__Country___3A81B327");

                entity.HasOne(d => d.UIdNavigation)
                    .WithMany(p => p.Recipes)
                    .HasForeignKey(d => d.UId)
                    .HasConstraintName("FK__Recipe__U_id__38996AB5");
            });

            modelBuilder.Entity<RecipeFeedback>(entity =>
            {
                entity.HasKey(e => e.RfbId)
                    .HasName("PK_RFB_id");

                entity.ToTable("RecipeFeedback");

                entity.Property(e => e.RfbId).HasColumnName("RFB_id");

                entity.Property(e => e.Content).HasMaxLength(2000);

                entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.RId).HasColumnName("R_id");

                entity.Property(e => e.UId).HasColumnName("U_id");

                entity.HasOne(d => d.RIdNavigation)
                    .WithMany(p => p.RecipeFeedbacks)
                    .HasForeignKey(d => d.RId)
                    .HasConstraintName("FK__RecipeFeed__R_id__440B1D61");

                entity.HasOne(d => d.UIdNavigation)
                    .WithMany(p => p.RecipeFeedbacks)
                    .HasForeignKey(d => d.UId)
                    .HasConstraintName("FK__RecipeFeed__U_id__4316F928");
            });

            modelBuilder.Entity<SubmissionContest>(entity =>
            {
                entity.HasKey(e => e.ScId)
                    .HasName("PK_SC_id");

                entity.ToTable("SubmissionContest");

                entity.Property(e => e.ScId).HasColumnName("SC_id");

                entity.Property(e => e.AverageScore).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ContestId).HasColumnName("Contest_id");

                entity.Property(e => e.Image).HasMaxLength(200);

                entity.Property(e => e.Ingredients).HasMaxLength(200);

                entity.Property(e => e.Title).HasMaxLength(200);

                entity.Property(e => e.UId).HasColumnName("U_id");

                entity.HasOne(d => d.Contest)
                    .WithMany(p => p.SubmissionContests)
                    .HasForeignKey(d => d.ContestId)
                    .HasConstraintName("FK__Submissio__Conte__5070F446");

                entity.HasOne(d => d.UIdNavigation)
                    .WithMany(p => p.SubmissionContests)
                    .HasForeignKey(d => d.UId)
                    .HasConstraintName("FK__Submission__U_id__4F7CD00D");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UId)
                    .HasName("PK_U_id");

                entity.ToTable("User");

                entity.HasIndex(e => e.Email, "UQ__User__A9D105347B8D8E93")
                    .IsUnique();

                entity.Property(e => e.UId).HasColumnName("U_id");

                entity.Property(e => e.Avatar).HasMaxLength(200);

                entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.Password).HasMaxLength(1000);

                entity.Property(e => e.Role)
                    .HasMaxLength(20)
                    .HasDefaultValueSql("('user')");

                entity.Property(e => e.UserName).HasMaxLength(200);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
