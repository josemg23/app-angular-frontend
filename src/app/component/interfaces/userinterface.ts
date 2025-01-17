export interface UserInterface {
  id: number;
  username: string;
  first_name: string;
  email: string;
  last_name: string;
  department_id: number;
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
