import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppFestButtonComponent } from '@components/app-fest-button.component';

type Club = {
  id: number | string;
  name: string;
  logoUrl?: string;
  coverUrl?: string;
};
type Artist = { id: number | string; name: string; avatarUrl?: string };

type Schedule = {
  date: string;
  time: string;
};

@Component({
  standalone: true,
  selector: 'app-event-form',
  imports: [CommonModule, FormsModule, AppFestButtonComponent],
  templateUrl: './event-form.component.html',
})
export class EventFormComponent {
  isSaving = false;

  // Club
  clubs: Club[] = [
    {
      id: 1,
      name: 'Casablanca',
      logoUrl:
        'https://marketplace.canva.com/EAFzhZVxJKY/1/0/1600w/canva-logo-simple-deportivo-de-futbol-minimalista-violeta-rosa-sbg6_bZ4iI4.jpg',
      coverUrl:
        'https://img.freepik.com/foto-gratis/audiencia-emocionada-viendo-fuegos-artificiales-confeti-divirtiendose-festival-musica-noche-copiar-espacio_637285-559.jpg?semt=ais_hybrid&w=740&q=80',
    },
    {
      id: 2,
      name: 'Skatten Oslo',
      logoUrl:
        'https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/151/posts/32935/image/Logo12.jpg',
      coverUrl:
        'https://img.freepik.com/foto-gratis/audiencia-emocionada-viendo-fuegos-artificiales-confeti-divirtiendose-festival-musica-noche-copiar-espacio_637285-559.jpg?semt=ais_hybrid&w=740&q=80',
    },
    {
      id: 3,
      name: 'Harlem',
      logoUrl:
        'https://i.pinimg.com/736x/4f/ee/a5/4feea5eb337445108ca0cf2aaaa77624.jpg',
      coverUrl:
        'https://weezevent.com/wp-content/uploads/2019/01/12145054/organiser-soiree.jpg',
    },
  ];
  clubQuery = '';
  filteredClubs: Club[] = [];
  selectedClub: Club | null = null;

  // Título / descripción
  title = '';
  description = '';

  // Artistas
  artistsDb: Artist[] = [
    {
      id: 1,
      name: 'Bad Bunny',
      avatarUrl:
        'https://forbes.pe/_next/image?url=https%3A%2F%2Fcdn.forbes.pe%2F2021%2F12%2FBenito-Martinez-_Bad-Bunny-NARCOS-e1638390381442-640x360-1.jpg&w=3840&q=75',
    },
    {
      id: 2,
      name: 'Maluma',
      avatarUrl:
        'https://www.monitorlatino.com/wp-content/uploads/2021/11/obstaculos_de_los_artistas_urbanos.jpg',
    },
    {
      id: 3,
      name: 'Camilo',
      avatarUrl:
        'https://www.fmdos.cl/wp-content/uploads/2021/02/Estos-son-los-grandes-exitos-compuestos-por-Camilo-para-otros-artistas.jpg',
    },
  ];
  artistQuery = '';
  filteredArtists: Artist[] = [];
  selectedArtists: Artist[] = [];

  // Categorías
  categories: string[] = [
    'Party',
    'Latin',
    'Afrobeat',
    'Techno / House',
    'Student',
    'Themed',
    'LGBTQ+ / Drag',
    'Indie / Rock',
    'Hip-Hop / R&B',
    'Live Music',
    'Jazz & Blues',
    'Disco / Funk',
    'Folk / Americana',
    'Games & Quiz',
    'Pop',
    'Comedy & Shows',
    'Karaoke',
  ];

  selectedCategories = new Set<string>();

  // Schedules (al menos 1)
  schedules: Schedule[] = [{ date: '', time: '' }];

  // Imagen única
  imageFile: File | null = null;
  imagePreview: string | null = null;

  // --- Métodos UI (maquetación) ---
  filterClubs() {
    const q = this.clubQuery.toLowerCase().trim();
    this.filteredClubs = this.clubs.filter((c) =>
      c.name.toLowerCase().includes(q)
    );
  }
  selectClub(c: Club) {
    this.selectedClub = c;
    this.clubQuery = '';
    this.filteredClubs = [];
  }
  clearClub() {
    this.selectedClub = null;
  }

  filterArtists() {
    const q = this.artistQuery.toLowerCase().trim();
    this.filteredArtists = this.artistsDb.filter((a) =>
      a.name.toLowerCase().includes(q)
    );
  }
  addArtist(a: Artist) {
    if (!this.selectedArtists.find((x) => x.id === a.id)) {
      this.selectedArtists.push(a);
    }
    this.artistQuery = '';
    this.filteredArtists = [];
  }
  removeArtist(a: Artist) {
    this.selectedArtists = this.selectedArtists.filter((x) => x.id !== a.id);
  }

  toggleCategory(cat: string) {
    if (this.selectedCategories.has(cat)) this.selectedCategories.delete(cat);
    else this.selectedCategories.add(cat);
  }

  addSchedule() {
    this.schedules.push({ date: '', time: '' });
  }
  removeSchedule(i: number) {
    if (this.schedules.length > 1) this.schedules.splice(i, 1);
  }

  onImageSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.setImage(file);
  }
  onDragOver(e: DragEvent) {
    e.preventDefault();
  }
  onDrop(e: DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file) this.setImage(file);
  }
  setImage(file: File) {
    this.imageFile = file;
    if (this.imagePreview) URL.revokeObjectURL(this.imagePreview);
    this.imagePreview = URL.createObjectURL(file);
  }
  removeImage() {
    this.imageFile = null;
    if (this.imagePreview) URL.revokeObjectURL(this.imagePreview);
    this.imagePreview = null;
  }

  formValid(): boolean {
    const hasClub = !!this.selectedClub;
    const hasTitle = this.title.trim().length > 0;
    const hasCats = this.selectedCategories.size >= 1;
    const hasImage = !!this.imageFile;
    const hasSchedule = this.schedules.some((s) => s.date && s.time);
    return hasClub && hasTitle && hasCats && hasImage && hasSchedule;
  }

  // Maqueta: muestra próxima fecha legible en el preview
  displayNextSchedule(): string {
    const valid = this.schedules
      .filter((s) => s.date && s.time)
      .map((s) => new Date(`${s.date}T${s.time}`))
      .sort((a, b) => a.getTime() - b.getTime());
    if (!valid.length) return '—';
    const d = valid[0];
    return (
      d.toLocaleDateString() +
      ' ' +
      d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  }

  // Stub de submit (tú conectas al backend)
  async onSubmit() {
    if (!this.formValid()) return;
    this.isSaving = true;
    // aquí conectas tu servicio…
    setTimeout(() => {
      this.isSaving = false;
    }, 800);
  }
}
