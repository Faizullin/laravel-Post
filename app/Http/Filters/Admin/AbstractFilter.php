<?php

namespace App\Http\Filters\Admin;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use App\Http\Filters\AbstractFilter as OriginalAbastractFilter;
use Illuminate\Http\Response;

abstract class AbstractFilter extends OriginalAbastractFilter
{
    /**
     * Column names are alphanumeric strings that can contain
     * underscores (`_`) but can't start with a number.
     */
    private const VALID_COLUMN_NAME_REGEX = '/^(?![\d])[A-Za-z0-9_>-]*$/';

    public $appliedFilters = [
        'per_page' => 1,
    ];

    /**
     * Filter constructor.
     *
     * @param Request|null $request
     */
    public function __construct(Request $request = null)
    {
        $this->request = $request ?? request();

        $this->input = [
            'filters' => $this->request->collect('filter')
                ->map(fn ($item) => $this->parseHttpValue($item))
                ->filter(fn ($item) => $item !== null),
            'sorts' => [
                'column' => $this->request->get('sort_field', ''),
                'order' => $this->request->get('sort_order', ''),
            ],
        ];
        foreach ($this->request->except(['filter','sort_field','sort_order']) as $column => $value) {
            if(array_key_exists($column,$this->appliedFilters)) {
                $this->appliedFilters[$column] = $value;
            }
        }
    }

    /**
     * @param string|null|array $query
     *
     * @return string|array|null
     */
    protected function parseHttpValue($query)
    {
        if (is_string($query)) {
            $item = explode(',', $query);

            if (count($item) > 1) {
                return $item;
            }
        }

        return $query;
    }

    /**
     * @param string $column
     *
     * @return string
     */
    public static function sanitize(string $column): string
    {
        abort_unless(preg_match(self::VALID_COLUMN_NAME_REGEX, $column), Response::HTTP_BAD_REQUEST);

        return $column;
    }

    protected function sortQuery()
    {
        $column = $this->input['sorts']['column'];
        $order = $this->input['sorts']['order'];
        if ($order && $column && in_array(strtolower($order),["asc","desc"])) {
            if(in_array($column,$this->sortable)) {
                if (method_exists($this, Str::camel($column).'SortFilter')) {
                    call_user_func_array([$this, Str::camel($column).'SortFilter'],[ $order]);
                    $this->appliedFilters['sorts']['order'] = $order;
                    $this->appliedFilters['sorts']['column'] = $column;
                } else {
                    $this->basicSortFilter($column, $order);
                    $this->appliedFilters['sorts']['order'] = $order;
                    $this->appliedFilters['sorts']['column'] = $column;
                }
            }
        }

    }
}
