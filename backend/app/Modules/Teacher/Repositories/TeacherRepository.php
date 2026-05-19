<?php

namespace App\Modules\Teacher\Repositories;

use App\Modules\Teacher\Interfaces\TeacherRepositoryInterface;
use App\Models\User;

class TeacherRepository implements TeacherRepositoryInterface
{
    protected $model;

    public function __construct(User $model)
    {
        $this->model = $model->where('role', 'teacher');
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function findByEmail($email)
    {
        return $this->model->where('email', $email)->first();
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $teacher = $this->find($id);
        if ($teacher) {
            $teacher->update($data);
            return $teacher;
        }
        return null;
    }

    public function delete($id)
    {
        $teacher = $this->find($id);
        if ($teacher) {
            $teacher->delete();
            return true;
        }
        return false;
    }

    public function getAll($filters = [])
    {
        $query = $this->model->newQuery();

        // Apply filters
        foreach ($filters as $field => $value) {
            if (is_array($value)) {
                // Handle range filters like ['from' => 100, 'to' => 200]
                if (isset($value['from']) && isset($value['to'])) {
                    $query->whereBetween($field, [$value['from'], $value['to']]);
                }
                // Handle IN filters
                elseif (isset($value['in'])) {
                    $query->whereIn($field, $value['in']);
                }
                // Handle NOT IN filters
                elseif (isset($value['not_in'])) {
                    $query->whereNotIn($field, $value['not_in']);
                }
            } else {
                // Handle exact match
                $query->where($field, $value);
            }
        }

        return $query->get();
    }

    public function paginate($perPage = 15, $filters = [])
    {
        $query = $this->model->newQuery();

        // Apply filters
        foreach ($filters as $field => $value) {
            if (is_array($value)) {
                // Handle range filters like ['from' => 100, 'to' => 200]
                if (isset($value['from']) && isset($value['to'])) {
                    $query->whereBetween($field, [$value['from'], $value['to']]);
                }
                // Handle IN filters
                elseif (isset($value['in'])) {
                    $query->whereIn($field, $value['in']);
                }
                // Handle NOT IN filters
                elseif (isset($value['not_in'])) {
                    $query->whereNotIn($field, $value['not_in']);
                }
            } else {
                // Handle exact match
                $query->where($field, $value);
            }
        }

        return $query->paginate($perPage);
    }
}