import { useCounter } from '@/hooks/useCounter';

const StatCard = ({ value, label }: { value: number; label: string }) => {
  const { count, ref } = useCounter(value);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
        {count}{value >= 1000 ? 'k' : '+'}
      </div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
};

const Stats = () => {
  const stats = [
    { value: 10, label: 'Projects Built' },
    { value: 20, label: 'GitHub Repos' },
    { value: 10, label: 'Technologies' },
    { value: 50, label: 'Lines of Code' },
  ];

  return (
    <section id="stats" className="py-16 px-6 bg-muted/30">
      <div className="container">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 fade-up text-center">Stats</h2>
        <p className="text-muted-foreground mb-10 fade-up text-center">A glimpse into my coding journey.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;