export const PIECE_COLOR = {
    WHITE: 1,
    BLACK: 0,
    NONE: -1
};

export const PIECE_TYPE = {
    EMPTY: 0,
    NONE: 1,
    EN_PASSANT: 2,
    PAWN: 3,
    KNIGHT: 4,
    BISHOP: 5,
    ROOK: 6,
    QUEEN: 7,
    KING: 8
};

export const MATERIAL_VALUE = {
    [PIECE_TYPE.EMPTY]: 0,
    [PIECE_TYPE.NONE]: 0,
    [PIECE_TYPE.EN_PASSANT]: 0,
    [PIECE_TYPE.PAWN]: 1,
    [PIECE_TYPE.KNIGHT]: 3,
    [PIECE_TYPE.BISHOP]: 3,
    [PIECE_TYPE.ROOK]: 5,
    [PIECE_TYPE.QUEEN]: 9,
    [PIECE_TYPE.KING]: 1337
};
