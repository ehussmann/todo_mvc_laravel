<?php

class TodosController extends BaseController {


	public $restful = true;
	/**
	 * Todo Repository
	 *
	 * @var Todo
	 */
	protected $todo;

	public function __construct(Todo $todo)
	{
		$this->todo = $todo;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        return $this->todo->all();
	}

	

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$in = Input::all();
		$todo = $this->todo->create($in);
		return $todo;
	}

	
	
	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$in = Input::all();
		$todo = $this->todo->find($id);
		$todo->fill($in);
		$ret = $todo->save();
		return $todo;
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$todo = $this->todo->find($id);
		$del = $todo->delete();
	}

}
