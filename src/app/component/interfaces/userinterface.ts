export interface UserInterface {
  id: number;
  username: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  middle_last_name: string;
  email: string;
  department_id: number;
  position_id: number;
}

export interface UserInterfaceResponse {
  id: number;
  username: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  middle_last_name: string;
  email: string;
  department_id: number;
  department?: DepartmentInterface;
  position?: PositionInterface;
  position_id: number;
}

export interface DepartmentInterfaceResponse {
  status: boolean;
  message: string;
  deparments: {
    headers: {};
    original: Array<DepartmentInterface>;
    exception: null;
  };
}

export interface DepartmentInterface {
  id: number;
  codigo: string;
  nombre: string;
  active: number;
  user_id: number;
  created_at: string;
  updated_at: string | null;
}

export interface PositionInterface {
  id: number;
  codigo: string;
  nombre: string;
  active: number;
  user_id: number;
  created_at: string;
  updated_at: string | null;
}
