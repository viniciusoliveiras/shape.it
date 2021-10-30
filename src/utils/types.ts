export interface IExercice {
  id?: string;
  nome?: string;
  serie?: number;
  repeticoes?: string;
  peso?: number;
  treino?: string;
  usuario?: string;
}

export interface IWorkout {
  id?: string;
  nome?: string;
  descricao?: string;
  usuario?: string;
}

export interface ILoggedUser {
  name?: string;
  email?: string;
  avatar_url?: string;
}
