'use client'
import ProtectedRoute from '../../components/ProtectedRoute';
import EntrepreneurialTest from './EntrepreneurialTest';

export default function TestPage() {
  return (
    <ProtectedRoute>
      <EntrepreneurialTest />
    </ProtectedRoute>
  );
}